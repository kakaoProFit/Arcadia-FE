import React from 'react'
import {
  Ripple,
  Input,
  initTWE,
} from "tw-elements";

import { Grid } from '@mui/material'
// import { useForm, useController } from 'react-hook-form'
// import JoinRules from '@/constants/Rules/JoinRules'

initTWE({ Ripple, Input });


// const rules = JoinRules
// function ValidInput({ control, name, ruleName }) {
//   const {
//     field,
//     fieldState: { invalid, isTouched, isDirty, error },
//     formState: { touchedFields, dirtyFields },
//   } = useController({
//     name,
//     control,
//     rules: rules[ruleName],
//   })

//   return (
//     <div>asas</div>
//   )
// }

const ValidForm = () => {
  // const methods = useForm()
  // const { register, handleSubmit, control } = methods
  // const submitHandler = (data) => {
  //   // 데이터 처리
  // }
  const testInputFields = [
    { type: 'email', id: 'exampleInput1', placeholder: 'Email address', text: 'Email address'},
    { type: 'password', id: 'exampleInput2', placeholder: 'Password', text: 'Password'},
    { type: 'text', id: 'exampleInput3', placeholder: 'Nickname', text: 'Nickname'},
    { type: 'tel', id: 'exampleInput4', placeholder: 'Phone number', text: 'Phone number'},
    { type: 'date', id: 'exampleInput5', placeholder: 'Birth', text: 'Birth'},
  ]
  return (
      <div
        class="mx-auto block max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-surface-dark">
        <form>
          <div class="grid grid-cols-2 gap-4">
            <div class="rounded border relative mb-6" data-twe-input-wrapper-init>
              <input
                type="text"
                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleInput123"
                aria-describedby="emailHelp124"
                placeholder="First name" />
              <label
                for="emailHelp123"
                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-300 dark:peer-focus:text-primary"
                >First name
              </label>
            </div>
            <div class="rounded border relative mb-6" data-twe-input-wrapper-init>
              <input
                type="text"
                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleInput123"
                aria-describedby="emailHelp124"
                placeholder="Last name" />
              <label
                for="emailHelp123"
                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-300 dark:peer-focus:text-primary"
                >Last name
              </label>
            </div>
            </div>
            {testInputFields.map((inputField, index) => (
              <div key={index} class="rounded border relative mb-6" data-twe-input-wrapper-init>
                <input
                  type={inputField.type}
                  class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                  id="exampleInput124"
                  aria-describedby={inputField.id}
                  placeholder={inputField.placeholder}/>
                <label
                  for={inputField.id}
                  class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-300 dark:peer-focus:text-primary"
                  >{inputField.text}
                </label>
              </div>
            ))}
            <button
              type="submit"
              class="inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
              data-twe-ripple-init
              data-twe-ripple-color="light">
              Sign up
            </button>
        </form>
      </div>
  )
}

export default function SignUp() {
  return (
    <div className="grid gap-20 grid-cols-2 shadow">
      <div className="flex mx-10 my-10 flex-col justify-center items-center">
        <ValidForm />
      </div>
      <Grid
        item
        xs={false}
        sm={8}
        md={5}
        style={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'fit',
          backgroundPosition: 'center',
        }}
      >
      </Grid>
      </div>
  )
}
