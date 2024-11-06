export default async function EditUserPage({ params } : { params: { username: string }}) {

    return (
        <p>{params.username}</p>
    )
}