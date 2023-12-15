import { Button, Card, TextInput, Title } from "@tremor/react";
import { useUserActions } from "../hooks/useUserActions";

export function CreateNewUser() {
    const { addUser } = useUserActions()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;

        const formData = new FormData(form);

        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const github = formData.get('github') as string;

        addUser({name, email, github});
        form.reset
    }

    return (
        <Card>
            <Title>Crear nuevo Usuario</Title>

            <form onSubmit={handleSubmit}>
                <TextInput placeholder="Nombre" name="name">

                </TextInput>
                <TextInput placeholder="Email" name="email">

                </TextInput>
                <TextInput placeholder="Github" name="github">

                </TextInput>

                <div>
                    <Button type="submit"> Crear Usuario</Button>
                </div>
            </form>
        </Card>
    )
}