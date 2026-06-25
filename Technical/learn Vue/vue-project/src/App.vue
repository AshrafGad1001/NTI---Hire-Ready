<script setup lang="ts">
import { ref, computed } from 'vue'

// Form Data
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  rePassword: '',
  country: '',
})

const submitted = ref(false)
const errors = ref<Record<string, string>>({})

// Countries for v-for
const countries = [
  { code: 'eg', name: 'Egypt' },
  { code: 'sa', name: 'Saudi Arabia' },
  { code: 'ae', name: 'UAE' },
  { code: 'us', name: 'USA' },
  { code: 'uk', name: 'UK' },
]

// Check if passwords match
const passwordsMatch = computed(() => {
  if (form.value.rePassword === '') return true
  return form.value.password === form.value.rePassword
})

// Get selected country name
const selectedCountryName = computed(() => {
  const found = countries.find(c => c.code === form.value.country)
  return found ? found.name : ''
})

// Validate phone for Egypt (starts with 01, then 10 digits total)
function isValidEgyptPhone(phone: string): boolean {
  if (form.value.country !== 'eg') return phone.length >= 8
  return /^01[0-9]{9}$/.test(phone)
}

// Validate form
function validate(): boolean {
  errors.value = {}

  if (form.value.firstName.trim() === '') {
    errors.value.firstName = 'First name is required'
  }

  if (form.value.lastName.trim() === '') {
    errors.value.lastName = 'Last name is required'
  }

  if (form.value.email.trim() === '') {
    errors.value.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email'
  }

  if (form.value.phone.trim() === '') {
    errors.value.phone = 'Phone number is required'
  } else if (!isValidEgyptPhone(form.value.phone)) {
    if (form.value.country === 'eg') {
      errors.value.phone = 'Must start with 01 and be 11 digits'
    } else {
      errors.value.phone = 'Please enter a valid phone number'
    }
  }

  if (form.value.password === '') {
    errors.value.password = 'Password is required'
  } else if (form.value.password.length < 6) {
    errors.value.password = 'Password must be at least 6 characters'
  }

  if (form.value.rePassword === '') {
    errors.value.rePassword = 'Please confirm your password'
  } else if (form.value.password !== form.value.rePassword) {
    errors.value.rePassword = 'Passwords do not match'
  }

  if (form.value.country === '') {
    errors.value.country = 'Please select a country'
  }

  return Object.keys(errors.value).length === 0
}

function submitForm() {
  if (validate()) {
    submitted.value = true
  }
}

function resetForm() {
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    rePassword: '',
    country: '',
  }
  errors.value = {}
  submitted.value = false
}
</script>

<template>
  <div class="container">
    <h1>Registration Form</h1>

    <!-- FORM -->
    <form @submit.prevent="submitForm" v-if="!submitted" class="form">

      <!-- First Name -->
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input id="firstName" v-model="form.firstName" type="text" placeholder="Enter your first name"
          :class="{ 'input-error': errors.firstName }" />
        <span v-if="errors.firstName" class="error-text">{{ errors.firstName }}</span>
      </div>

      <!-- Last Name -->
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input id="lastName" v-model="form.lastName" type="text" placeholder="Enter your last name"
          :class="{ 'input-error': errors.lastName }" />
        <span v-if="errors.lastName" class="error-text">{{ errors.lastName }}</span>
      </div>

      <!-- Email -->
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="email" placeholder="example@mail.com"
          :class="{ 'input-error': errors.email }" />
        <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
      </div>

      <!-- Phone Number -->
      <div class="form-group">
        <label for="phone">Phone Number</label>
        <input id="phone" v-model="form.phone" type="tel" placeholder="01012345678"
          :class="{ 'input-error': errors.phone }" />
        <span v-if="errors.phone" class="error-text">{{ errors.phone }}</span>
        <!-- v-if / v-else: Show phone format hint -->
        <span v-if="form.country === 'eg' && form.phone.length > 0 && !errors.phone" class="hint-text">
          Egypt format: 01XXXXXXXXX
        </span>
        <span v-else-if="form.country !== 'eg' && form.country !== '' && form.phone.length > 0" class="hint-text">
          International format
        </span>
      </div>

      <!-- Country -->
      <div class="form-group">
        <label for="country">Country</label>
        <select id="country" v-model="form.country" :class="{ 'input-error': errors.country }">
          <option value="" disabled>-- Select Country --</option>
          <!-- v-for: Loop countries -->
          <option v-for="country in countries" :key="country.code" :value="country.code">
            {{ country.name }}
          </option>
        </select>
        <span v-if="errors.country" class="error-text">{{ errors.country }}</span>
      </div>

      <!-- Password -->
      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" v-model="form.password" type="password" placeholder="Enter your password"
          :class="{ 'input-error': errors.password }" />
        <span v-if="errors.password" class="error-text">{{ errors.password }}</span>
        <!-- v-if / v-else-if / v-else: Password strength -->
        <div v-if="form.password.length > 0 && form.password.length < 6" class="strength weak">
          Weak
        </div>
        <div v-else-if="form.password.length >= 6 && form.password.length < 10" class="strength medium">
          Medium
        </div>
        <div v-else-if="form.password.length >= 10" class="strength strong">
          Strong
        </div>
      </div>

      <!-- Re Password -->
      <div class="form-group">
        <label for="rePassword">Confirm Password</label>
        <input id="rePassword" v-model="form.rePassword" type="password" placeholder="Confirm your password"
          :class="{ 'input-error': errors.rePassword }" />
        <span v-if="errors.rePassword" class="error-text">{{ errors.rePassword }}</span>
        <!-- v-if / v-else: Password match status -->
        <span v-if="form.rePassword.length > 0 && passwordsMatch" class="match-text success">
          Passwords match
        </span>
        <span v-else-if="form.rePassword.length > 0 && !passwordsMatch" class="match-text error">
          Passwords do not match
        </span>
      </div>

      <!-- Buttons -->
      <div class="btn-group">
        <button type="submit" class="btn btn-submit">Register</button>
        <button type="button" @click="resetForm" class="btn btn-reset">Reset</button>
      </div>
    </form>

    <!-- RESULT -->
    <div v-else class="result">
      <h2>Registration Successful</h2>

      <div class="result-card">
        <div class="result-row">
          <span class="result-label">Full Name:</span>
          <span>{{ form.firstName }} {{ form.lastName }}</span>
        </div>
        <div class="result-row">
          <span class="result-label">Email:</span>
          <span>{{ form.email }}</span>
        </div>
        <div class="result-row">
          <span class="result-label">Phone:</span>
          <!-- v-if: Add Egypt code -->
          <span v-if="form.country === 'eg'">+20 {{ form.phone }}</span>
          <span v-else>{{ form.phone }}</span>
        </div>
        <div class="result-row">
          <span class="result-label">Country:</span>
          <span>{{ selectedCountryName }}</span>
        </div>
      </div>

      <button @click="resetForm" class="btn btn-submit" style="margin-top: 20px;">
        Back to Form
      </button>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 500px;
  margin: 40px auto;
  padding: 30px;
  font-family: Arial, sans-serif;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
}

h1 {
  color: darkblue;
  text-align: center;
  margin-bottom: 25px;
}

h2 {
  color: #2e7d32;
  text-align: center;
  margin-bottom: 20px;
}

/* Form */
.form {
  background: white;
  padding: 25px;
  border-radius: 8px;
  border: 1px solid #eee;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 6px;
  color: #333;
  font-size: 14px;
}

/* Inputs */
input[type="text"],
input[type="email"],
input[type="tel"],
input[type="password"],
select {
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
}

input:focus,
select:focus {
  outline: none;
  border-color: darkblue;
}

.input-error {
  border-color: #f44336;
}

/* Messages */
.error-text {
  display: block;
  color: #f44336;
  font-size: 12px;
  margin-top: 4px;
}

.hint-text {
  display: block;
  color: #888;
  font-size: 12px;
  margin-top: 4px;
}

/* Password Strength */
.strength {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  margin-top: 4px;
}

.strength.weak {
  background: #ffebee;
  color: #c62828;
}

.strength.medium {
  background: #fff8e1;
  color: #f57f17;
}

.strength.strong {
  background: #e8f5e9;
  color: #2e7d32;
}

/* Password Match */
.match-text {
  display: block;
  font-size: 12px;
  margin-top: 4px;
}

.match-text.success {
  color: #2e7d32;
}

.match-text.error {
  color: #f44336;
}

/* Buttons */
.btn-group {
  display: flex;
  gap: 10px;
  margin-top: 25px;
}

.btn {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
}

.btn:hover {
  opacity: 0.85;
}

.btn-submit {
  background: darkblue;
  color: white;
}

.btn-reset {
  background: #9e9e9e;
  color: white;
}

/* Result */
.result {
  background: white;
  padding: 25px;
  border-radius: 8px;
  border: 2px solid #4caf50;
}

.result-card {
  margin-top: 15px;
}

.result-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.result-row:last-child {
  border-bottom: none;
}

.result-label {
  font-weight: bold;
  color: #555;
}
</style>