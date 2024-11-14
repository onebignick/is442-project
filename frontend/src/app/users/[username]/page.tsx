interface IndividualUserPageProps {
    params: { username: string };
}

export default function IndividualUserPage({ params } : IndividualUserPageProps) {
    return (
        <p>{params.username}</p>
    )
}