export function Profile() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-800 text-black dark:text-white p-8">
            <div className="max-w-2xl mx-auto bg-gray-100 dark:bg-slate-900 rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-bold mb-6 text-teal-500">User Profile</h1>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-500">Name</label>
                        <p className="text-lg">{localStorage.getItem('name') || 'N/A'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
