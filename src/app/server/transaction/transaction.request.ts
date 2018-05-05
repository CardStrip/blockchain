export class TransactionRequest {
    public recipient: string;
    public amount: number;

    public isValid() {
        if (!this.recipient) return false;
        if (!this.amount) return false;
        if (this.amount <= 0) return false;

        return true;
    }

}
