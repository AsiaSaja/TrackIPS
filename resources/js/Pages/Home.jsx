import { Head } from '@inertiajs/react';

export default function Home() {
  return (
    <div className="p-8">
      <Head title="Home" />
      <h1 className="text-4xl font-bold text-green-600">
        🎉 React Sudah Berjalan!
      </h1>
      <p className="mt-4 text-gray-600">
        Jika Anda melihat pesan ini, artinya React + Inertia.js terhubung dengan baik.
      </p>
    </div>
  );
}