import Container from "@/component/Container/Container";
import NewsEvents from "@/component/News&Events/NewsEvents";

const page = () => {
    return (
        <div className="text-gray-900">
            <Container>
                <NewsEvents />
            </Container>
        </div>
    );
};

export default page;