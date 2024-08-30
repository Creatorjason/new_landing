'use server'

import { signIn } from "@/auth"

export async function authenticate(formData) {
  try {
    const result = await signIn("credentials", {
      uns: formData.uns,
      password: formData.password,
      redirect: false,
    })

    if (result?.error) {
      return { error: result.error }
    }

    return { success: true }
  } catch (error) {
    return { error: error.message || "Something went wrong" }
  }
}