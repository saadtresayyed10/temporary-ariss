import { useState } from 'react';

type ConfirmDeleteModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
};

const ConfirmDeleteModal = ({ isOpen, onClose, onDelete }: ConfirmDeleteModalProps) => {
    const [input, setInput] = useState('');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                <p className="text-sm text-gray-700 mb-4">
                    Type <span className="font-bold text-red-500">confirm</span> to enable the delete button.
                </p>
                <input
                    type="text"
                    placeholder="Type 'confirm'"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
                />
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onDelete}
                        disabled={input !== 'confirm'}
                        className={`px-4 py-2 rounded text-white transition cursor-pointer ${
                            input === 'confirm'
                                ? 'bg-red-600 hover:bg-red-700'
                                : 'bg-red-300 cursor-not-allowed'
                        }`}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;
