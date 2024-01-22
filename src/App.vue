<template>
  <Header />
  <Balance :total="+total" />
  <IncomeExpenses :income="+income" :expenses="+expenses" />
  <TransactionList
    :transactions="transactions"
    @transactionDeleted="handleTransactionDeleted"
  />
  <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
</template>

<script setup>
import Header from "./components/Header.vue";
import Balance from "./components/Balance.vue";
import IncomeExpenses from "./components/IncomeExpenses.vue";
import TransactionList from "./components/TransactionList.vue";
import AddTransaction from "./components/AddTransaction.vue";

import { useToast } from "vue-toastification";

const toast = useToast();

import { ref, computed, onMounted } from "vue";

const transactions = ref([]);

onMounted(() => {
  const savedTransaction = JSON.parse(localStorage.getItem("transactions"));

  if (savedTransaction) {
    transactions.value = savedTransaction;
  }
});

console.log(transactions.value);

// Get total
const total = computed(() => {
  return transactions.value.reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0);
});

// Get income
const income = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0)
    .toFixed(2);
});

// Get expenses
const expenses = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0)
    .toFixed(2);
});

// Add transaction
const handleTransactionSubmitted = (transactionData) => {
  transactions.value.push({
    id: generateUniqueId(),
    text: transactionData.text,
    amount: transactionData.amount,
  });

  savedTransactionToLocalStorage();

  toast.success("Transaction added!");
};

// Generate unique id
const generateUniqueId = () => {
  return Math.floor(Math.random() * 1000000);
};

// Delete transaction
const handleTransactionDeleted = (id) => {
  transactions.value = transactions.value.filter(
    (transaction) => transaction.id !== id
  );

  savedTransactionToLocalStorage();

  toast.success("Successfully deleted!");
};

// Save to localStorage
const savedTransactionToLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions.value));
};
</script>
