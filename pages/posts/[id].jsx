// could be getStaticProps, depending on how frequently
export async function getServerSideProps(context){
    const { id } = context.params;
    console.log(id);
    // const response = await fetch(`http://localhost:3000/api/get-post/${id}`);
    // const data = await response.json();
    const data = {"hello": "world"};
    return {
        props: {
            postData: data
        }
    }
}

export default function Post({ postData }) {
    console.log(postData);
    return (
        <div>post</div>
    )
}
