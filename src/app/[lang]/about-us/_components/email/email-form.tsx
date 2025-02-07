'use client';
import { Button } from '@/app/[lang]/_components/button';
import { PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID } from '@/configs/global';
import { ChangeEvent, FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import emailjs from 'emailjs-com';
import { useDictionary } from '@/providers/dictionary-provider';

export const EmailForm = () => {
  const [formValue, setFormValue] = useState({
    from_name: '',
    from_email: '',
    message: '',
  });
  const dict = useDictionary();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formValue.from_name || !formValue.from_email || !formValue.message) {
      toast.error(dict.send_email_field_error_message);
      return;
    }

    try {
      const response = await emailjs.send(SERVICE_ID!, TEMPLATE_ID!, formValue, PUBLIC_KEY!);

      if (response.status === 200) {
        toast.success(dict.send_email_success);
      } else {
        toast.error(dict.send_email_unsuccessful);
      }
    } catch (error) {
      toast.error(dict.send_email_error);
    }
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-y-3 mt-5">
      <div className="flex gap-x-3 flex-wrap md:flex-nowrap gap-y-3">
        <input
          placeholder={dict.email_placeholder}
          className="md:w-1/2 bg-transparent border border-dark-400 w-full h-12 rounded-md px-2 text-sm dark:placeholder:text-white"
          type="email"
          name="from_email"
          onChange={changeHandler}
        />
        <input
          placeholder={dict.name_placeholder}
          className="md:w-1/2 bg-transparent border border-dark-400 w-full h-12 rounded-md px-2 text-sm dark:placeholder:text-white"
          type="text"
          name="from_name"
          onChange={changeHandler}
        />
      </div>
      <textarea
        placeholder={dict.message_placeholder}
        className="h-44 rounded-md p-2 bg-transparent border border-dark-400 dark:placeholder:text-white"
        name="message"
        onChange={changeHandler}
      ></textarea>
      <Button type="submit" variant="dark-300">
        {dict.send_email_btn_text}
      </Button>
    </form>
  );
};
