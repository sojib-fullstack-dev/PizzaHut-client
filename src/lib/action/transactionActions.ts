const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

export interface TransactionRecord {
  _id: string;
  sessionId: string;
  payment_intent?: string;
  userName?: string;
  customer_email?: string;
  userId?: string;
  plan?: string;
  amount: number;
  payment_status: string;
  status: string;
  payment_date?: string;
  createdAt?: string;
}

// Fetch all transactions from Express backend
export async function getTransactions(): Promise<TransactionRecord[]> {
  try {
    const res = await fetch(`${API_BASE}/transactions`);
    if (!res.ok) {
      throw new Error(`Failed to fetch transactions: HTTP ${res.status}`);
    }

    const data = await res.json();
    let list: TransactionRecord[] = [];

    if (Array.isArray(data)) {
      list = data;
    } else if (Array.isArray(data?.data)) {
      list = data.data;
    } else if (Array.isArray(data?.transactions)) {
      list = data.transactions;
    }

    return list;
  } catch (err) {
    console.error("Error in getTransactions:", err);
    return [];
  }
}

