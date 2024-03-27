
export interface AccountInfo {
    customerId: number;
    accountNumber: number;
    accountType: string;
    branchAddress: string;
}

export interface AccountTransaction {
    accountNumber: number;
    customerId: number;
    transactionDt: Date;
    transactionSummary: string;
    transactionType: string;
    transactionAmt: number;
    closingBalance: number;
  }

  export interface Card {
    cardNumber: string;
    customerId: number;
    cardType: string;
    totalLimit: number;
    amountUsed: number;
    availableAmount: number;
  }

export interface ContactInfo {
  contactId?: string;
  contactName: string;
  contactEmail: string;
  subject: string;
  message: string;
}

export interface Loan {
  loanNumber: number;
  customerId: number;
  startDt: Date;
  loanType: string;
  totalLoan: number;
  amountPaid: number;
  outstandingAmount: number;
}

export interface LoginInfo {
  email : string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  mobileNumber: string;
  email : string;
  password?: string;
  role : string;
  statusCd: string;
  statusMsg : string;
  authStatus? : string;
}

export interface Notice {
  noticeSummary: string;
  noticeDetails: string;
}

export interface Validate {
  emailState: string;
  passwordState: string;
}
