import { Head } from '@inertiajs/react';


export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        Welcome to Tailwind!
      </h1>
      <button className="btn-primary">
        Klik Saya
      </button>
    </div>
  );
}