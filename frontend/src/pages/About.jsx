import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/about.css';

const About = () => {
    return (
        <div>
            <Navbar />
            <section id="about" class="about">
                <div class="row">
                    <div class="content">
                        <h3>Nossa História</h3>
                        <p>Nascemos em agosto de 2022. De lá pra cá, muuuita coisa mudou. Para melhor, é claro. Com o passar dos anos, fomos nos adaptando e aprendendo muito com cada uma das pessoas que por aqui passou. Passamos a compreender que a moda vai muito além de seguir tendências. Entendemos que se vestir é uma forma de comunicação, tem a ver com estilo individual de vida e precisa nos fazer sentir bem.
                            Nossa meta é construir e manter, uma relação de confiança e amizade com você, através do nosso atendimento e acolhimento. Acreditamos que a Moda pode (e deve) ser Consciente, Descomplicada e Versátil.
                            Para te apresentar a nossa proposta, realizamos uma curadoria minuciosa, com peças selecionadas a dedo e que sempre conversam entre si. Te demonstramos o quanto é possível consumir com consciência, ser descomplicada e abusar da versatilidade. Ahh, não podíamos esquecer de te contar o nosso toque final: aqui, em cade detalhe, você vai encontrar muuuuuito amor!
                            Vem fazer parte do nosso mundo!!! ♥</p>
                            <Link to='/contact'><button class="BTN">Consulte mais informações.</button></Link>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default About;