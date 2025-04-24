import { useState } from 'react';
import { Button } from '../../components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../api/authURL';
import { useAdminAuthStore } from '../../store/useAdminAuthStore';
import { Loader2 } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { fetchAdmin } = useAdminAuthStore();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await adminLogin(email, password);
            await fetchAdmin();
            navigate('/');
        } catch (err) {
            setError('Invalid email or password');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center w-full min-h-screen bg-white text-stone-800 font-work lg:p-10">
            <Card className="w-[380px]">
                <CardHeader>
                    <CardTitle className="font-posterama lg:text-4xl uppercase font-extralight">
                        Ariss
                    </CardTitle>
                    <CardDescription>Welcome back, login to access admin panel</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Admin email"
                                    className="rounded border shadow"
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter Password"
                                    className="rounded border shadow"
                                />
                            </div>
                            {error && <p className="text-sm text-red-500">{error}</p>}
                        </div>
                        <CardFooter className="w-full flex justify-center items-center flex-col lg:gap-y-6 mt-10">
                            <Button type="submit" className="w-full rounded shadow" disabled={loading}>
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Login'}
                            </Button>
                            <h6 className="text-sm text-stone-600">
                                Login as an Employee{' '}
                                <span className="text-orange-500 font-semibold underline underline-offset-4 cursor-pointer">
                                    Login
                                </span>
                            </h6>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
