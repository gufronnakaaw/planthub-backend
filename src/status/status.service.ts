import { Injectable } from '@nestjs/common';

@Injectable()
export class StatusService {
  getStatus() {
    return {
      waiting_payment: this.randomNumber(),
      success_payment: this.randomNumber(),
      failed_payment: this.randomNumber(),
      order_processing: this.randomNumber(),
      order_delivered: this.randomNumber(),
      order_completed: this.randomNumber(),
      order_expired: this.randomNumber(),
    };
  }

  private randomNumber(): number {
    return Math.floor(Math.random() * 20 + 1);
  }
}
