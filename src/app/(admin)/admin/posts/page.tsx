import Container from "@/components/UI/container";
import data from '@/translations/cz/cz.json'; 


export default function PostsSCreen () {
    return (
        <Container styled> 
            {data.posts.title}
        </Container>
    )
}