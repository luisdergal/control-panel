"use client";

import { fetchTotalActiveRegions, fetchTotalActiveUsers, fetchTotalRegions, fetchTotalUsers, fetchTotalVipUsers } from "./dashBoardService";
import { useEffect, useState } from "react";

import Link from "next/link";

export default function Dashboard() {
  const [totalRegions, setTotalRegions] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalVipUsers, setTotalVipUsers] = useState<number>(0);
  const [totalActiveUsers, setTotalActiveUsers] = useState<number>(0);
  const [totalActiveRegions, setTotalActiveRegions] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);

      const [regions, users, vipUsers, activeRegions, activeUsers] = await Promise.all([
        fetchTotalRegions(),
        fetchTotalUsers(),
        fetchTotalVipUsers(),
        fetchTotalActiveRegions(),
        fetchTotalActiveUsers(),
      ]);

      setTotalRegions(regions);
      setTotalUsers(users);
      setTotalVipUsers(vipUsers);
      setTotalActiveRegions(activeRegions);
      setTotalActiveUsers(activeUsers);
    } catch (err) {
      setError("Failed to load data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-400 animate-pulse">Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  return (
    <section className="p-8">
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/users">
          <Card title="Total Users" value={totalUsers} />
        </Link>
        <Link href="/regions">
          <Card title="Total Regions" value={totalRegions} />
        </Link>
        <Link href="/users">
          <Card title="Active Users" value={totalActiveUsers} />
        </Link>
        <Link href="/users">
          <Card title="VIP Users" value={totalVipUsers} />
        </Link>
        <Link href="/regions">
          <Card title="Active Regions" value={totalActiveRegions} />
        </Link>
      </div>
    </section>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="p-4 bg-gray-800 text-white rounded shadow">
      <h3 className="font-bold">{title}</h3>
      <p className="text-lg">{value}</p>
    </div>
  );
}