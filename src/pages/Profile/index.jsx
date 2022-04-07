import { useAuth } from "contexts";

const Profile = () => {
    const { authUser } = useAuth();

    return (
        <section className="section-wrapper flex-col flex-align-center flex-justify-center">
           <h3 className="text-center">👋 Welcome to inscribe profile! {authUser.firstName} {authUser.lastName}</h3>
        </section>
    )
}

export { Profile };