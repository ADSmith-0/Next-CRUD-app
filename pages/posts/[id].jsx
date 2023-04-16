// could be getStaticProps, depending on how frequently
// export async function getServerSideProps(context){
//     const { id } = context.params;
//     const response = await fetch(`http://localhost:3000/api/get-post/${id}`);
//     const data = await response.json();
//     return {
//         props: {
//             postData: data
//         }
//     }
// }

export default function Post({ postData }) {
    console.log(postData);
    return (
        <div>post</div>
    )
}
