import { useRouter, Stack } from 'expo-router';

import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import { Button, ButtonText } from '~/components/ui/button';

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <ScreenContent path="app/index.tsx" title="Home" />

        <Button size="xl" className="rounded-full" onPress={() => router.push('/login')}>
          <ButtonText className="font-worksans px-4 py-2">Login</ButtonText>
        </Button>
      </Container>
    </>
  );
}
