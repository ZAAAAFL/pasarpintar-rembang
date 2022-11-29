import React, { useEffect } from "react";
import Button from "@/Components/Button";
import Guest from "@/Layouts/Guest";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import ValidationErrors from "@/Components/ValidationErrors";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import Main from "@/Layouts/Main";

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    no_hp: "",
    alamat: "",
  });

  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);

  const onHandleChange = (event) => {
    setData(
      event.target.name,
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value
    );
  };

  const submit = (e) => {
    e.preventDefault();

    post(route("register"));
  };

  return (
    <Main>
      <Guest>
        <Head title="Register" />

        <h2 className="py-3 text-center text-2xl">Registrasi</h2>

        <ValidationErrors errors={errors} />

        <form onSubmit={submit}>
          <div>
            <Label forInput="name" value="Nama" />

            <Input
              type="text"
              name="name"
              value={data.name}
              className="mt-1 block w-full"
              autoComplete="name"
              isFocused={true}
              handleChange={onHandleChange}
              required
            />
          </div>

          <div className="mt-4">
            <Label forInput="email" value="Email" />

            <Input
              type="email"
              name="email"
              value={data.email}
              className="mt-1 block w-full"
              autoComplete="username"
              handleChange={onHandleChange}
              required
            />
          </div>

          <div className="mt-4">
            <Label forInput="password" value="Password" />

            <Input
              type="password"
              name="password"
              value={data.password}
              className="mt-1 block w-full"
              autoComplete="new-password"
              handleChange={onHandleChange}
              required
            />
          </div>

          <div className="mt-4">
            <Label
              forInput="password_confirmation"
              value="Konfirmasi Password"
            />

            <Input
              type="password"
              name="password_confirmation"
              value={data.password_confirmation}
              className="mt-1 block w-full"
              handleChange={onHandleChange}
              required
            />
          </div>

          <div className="mt-4">
            <Label forInput="no_hp" value="Nomor Telepon" />

            <Input
              type="text"
              name="no_hp"
              value={data.no_hp}
              className="mt-1 block w-full"
              handleChange={onHandleChange}
              required
            />
          </div>

          <div className="mt-4">
            <Label forInput="alamat" value="Alamat" />

            <textarea
              name="alamat"
              className="mt-1 p-2.5 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
              rows="4"
              value={data.alamat}
              onChange={onHandleChange}
            />
          </div>

          <div className="flex items-center justify-end mt-4">
            <Link
              href={route("login")}
              className="underline text-sm text-gray-600 hover:text-gray-900"
            >
              Sudah Registrasi?
            </Link>

            <Button className="ml-4" processing={processing}>
              Register
            </Button>
          </div>
        </form>
      </Guest>
    </Main>
  );
}
