import Header from '../layouts/Header'
import { Pets } from '../features/features'
import '../styles/pages/PetsPage.css'

export default function PetsPage() {
    return(<>
        <Header></Header>
        <Pets></Pets>
    </>);
}