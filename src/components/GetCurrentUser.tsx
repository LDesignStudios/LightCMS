import { getUser } from "@/utils/getUser";
import Container from "./UI/container";

export default async function GetCurrentUser () {
    const user = await getUser();

    return (
        <Container className="ml-2">
            {" "}{user.name || user.email}!
        </Container>
    )
}