import React from 'react'

const UserPage = () => {
    return (
        <div className="flex flex-col items-center justify-center m-10 text-lg">
            <h1 className="text-4xl font-semibold text-center mb-10">Account details</h1>
            <form className="space-y-6">
                <div>
                    <div>
                        <label className="text-sm">Email:</label>
                    </div>
                    <div>
                        <input type="email" name="email" className="border border-black rounded-lg p-3 w-full" />
                    </div>
                    <div className="w-full flex justify-end">
                        <button className="underline text-sm">
                            Edit
                        </button>
                    </div>
                </div>
                <div>
                    <div>
                        <label className="text-sm">Password:</label>
                    </div>
                    <div>
                        <input type="password" name="password" className="border border-black rounded-lg p-3 w-full" />
                    </div>
                    <div className="w-full flex justify-end">
                        <button className="underline text-sm">
                            Edit
                        </button>
                    </div>
                </div>
                <div className="flex justify-between items-center border-t border-b p-6">
                    <div className="mr-10">
                        Delete account
                    </div>
                    <button className="px-4 py-3 text-base tracking-wide rounded-full border hover:border-black">
                        Delete
                    </button>
                </div>
                <div className="mt-8 text-right mr-5">
                    <button className="px-6 py-3 tracking-wide text-white transition-colors duration-200 transform bg-green-90 rounded-full hover:bg-black">
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UserPage