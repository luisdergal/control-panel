export default function Dashboard() {
    return (
      <section>
        <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-200 dark:bg-gray-800 rounded shadow">
            <h3 className="font-bold">Users</h3>
            <p>123</p>
          </div>
          <div className="p-4 bg-gray-200 dark:bg-gray-800 rounded shadow">
            <h3 className="font-bold">Active Users</h3>
            <p>123</p>
          </div>
          <div className="p-4 bg-gray-200 dark:bg-gray-800 rounded shadow">
            <h3 className="font-bold">Active Regions</h3>
            <p>5</p>
          </div>
          <div className="p-4 bg-gray-200 dark:bg-gray-800 rounded shadow">
            <h3 className="font-bold">VIP Users</h3>
            <p>10</p>
          </div>
        </div>
      </section>
    );
  }