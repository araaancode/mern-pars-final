import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post('/api/register', {
        name,
        email,
        password,
      });
      alert('با موفقیت ثبت نام شدید');
    } catch (e) {
      alert('خطایی وجود دارد. ثبت نام نشدید!');
    }
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">ثبت نام</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input type="text"
            placeholder="نام"
            value={name}
            onChange={ev => setName(ev.target.value)} />
          <input type="email"
            placeholder="ایمیل"
            value={email}
            onChange={ev => setEmail(ev.target.value)} />
          <input type="password"
            placeholder="پسورد"
            value={password}
            onChange={ev => setPassword(ev.target.value)} />
          <button className="primary">ثبت نام</button>
          <div className="text-center py-2 text-gray-500">
            حساب دارید؟ <Link className="underline text-black" to={'/login'}> ورود</Link>
          </div>
        </form>
      </div>
    </div>
  );
}