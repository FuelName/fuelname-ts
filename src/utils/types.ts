import {
  BN,
  CallResult as FuelCallResult,
  FunctionResult,
  DryRunFailureStatusFragment, DryRunResult,
  ReceiptType,
  TransactionResultReceipt,
  TransactionStatus
} from "fuels";

// Not sure if it's a correct name
export type ScopeCall<T> = {
  transactionId: string;
  waitForResult: () => Promise<FunctionResult<T>>;
}

export class BaseCallResult<T> {
  isSuccess: boolean;
  receipts: TransactionResultReceipt[];
  value?: T;

  constructor(isSuccess: boolean, receipts: TransactionResultReceipt[], value: T | undefined) {
    this.isSuccess = isSuccess;
    this.receipts = receipts;
    this.value = value;
  }
}

export class ReadonlyCallResult<T> extends BaseCallResult<T> {
  constructor(isSuccess: boolean, receipts: TransactionResultReceipt[], value: T | undefined) {
    super(isSuccess, receipts, value);
  }

  static fromInvocationResult<T>(invocation: DryRunResult<T>): ReadonlyCallResult<T> {
    const isSuccess = isSuccessStatus(invocation.callResult);
    return new ReadonlyCallResult(
      isSuccess,
      invocation.callResult.receipts,
      isSuccess ? invocation.value : undefined
    );
  }

  map<U>(mapFn: (value: T) => U): ReadonlyCallResult<U> {
    return new ReadonlyCallResult(this.isSuccess, this.receipts, this.value ? mapFn(this.value) : undefined);
  }

  asFailure<U>(): ReadonlyCallResult<U> {
    return new ReadonlyCallResult<U>(false, this.receipts, undefined);
  }

  asCallFailure<U>(): CallResult<U> {
    return new CallResult<U>(false, this.receipts, undefined, undefined, undefined);
  }
}

export class CallResult<T> extends BaseCallResult<T> {
  txId?: string;
  gasUsed?: BN;

  constructor(isSuccess: boolean, receipts: TransactionResultReceipt[], value: T | undefined, txId: string | undefined, gasUsed: BN | undefined) {
    super(isSuccess, receipts, value);
    this.txId = txId;
    this.gasUsed = gasUsed;
  }

  static fromFunctionResult<T>(functionResult: FunctionResult<T>): CallResult<T> {
    const isSuccess = functionResult.transactionResult.status === TransactionStatus.success;
    return new CallResult(
      isSuccess,
      functionResult.transactionResult.receipts,
      isSuccess ? functionResult.value : undefined,
      functionResult.transactionId,
      functionResult.gasUsed
    );
  }

  map<U>(mapFn: (value: T) => U): CallResult<U> {
    return new CallResult(
      this.isSuccess,
      this.receipts,
      this.value ? mapFn(this.value) : undefined,
      this.txId,
      this.gasUsed
    );
  }
}

const errorReceipts = new Set<ReceiptType>([ReceiptType.Panic, ReceiptType.Revert]);

const isSuccessStatus = (callResult: FuelCallResult): boolean => {
  for (const receipt of callResult.receipts) {
    if (errorReceipts.has(receipt.type)) {
      return false;
    }
  }
  const status = callResult.dryRunStatus;
  if (status) {
    const isBadStatus = (status as DryRunFailureStatusFragment).reason !== undefined
    if (isBadStatus) {
      return false;
    }
  }
  return true;
}
