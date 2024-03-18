export default function UserProifle({params}:any){


    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl  ">Profile page:<span className="bg-orange-500">{params.id}</span></p>
        </div>
    )
}