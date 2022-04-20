import { ChangeEvent, useState } from 'react'

export const useForm = <T extends Object>( initialState: T ) => {
  
  const [formValues, setFormValues] = useState(initialState);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  }

  return {
    formValues,
    setFormValues,
    handleInputChange,
  }
}
