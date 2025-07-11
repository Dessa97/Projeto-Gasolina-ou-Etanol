import "./index.css";
import "./App.css";
import logoImg from "./assets/logo.png";
/*no caso de utilizar onSubmit, importar o useState e FormEvent.
-Você ganha autocompletar e validação de tipos no TypeScript(
  Autocompletar = O editor te sugere os métodos e propriedades corretas.
  Validação de tipos = O TypeScript te avisa se você estiver tentando acessar algo que não existe, 
  ou usar um tipo errado (ex: tratar string como número, etc).).
-O (e) agora é reconhecido como um evento de formulário.*/
import { useState, FormEvent } from "react";

interface resultProps {
  title: string;
  gasolina: string | number;
  alcool: string | number;
}

function App() {
  const [gasolinaInput, setGasolinaInput] = useState(0);
  const [alcoolInput, setAlcoolInput] = useState(0);
  const [result, setResult] = useState<resultProps>();

  function calcular(event: FormEvent) {
    /*preventDefault evita que a pagina recarregue após o onSubmit*/
    event.preventDefault();

    /*calculo*/
    let calculo = alcoolInput / gasolinaInput;
    if (calculo <= 0.7) {
      setResult({
        title: "Compensa usar Álcool!",
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput),
      });
    } else {
      setResult({
        title: "Compensa usar Gasolina!",
        gasolina: gasolinaInput,
        alcool: alcoolInput,
      });
    }
  }

  function formatarMoeda(valor: number) {
    let valorFormatado = valor.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
    return valorFormatado;
  }
  return (
    <div>
      <main className="container">
        <img className="logo" src={logoImg} alt="logo posto de gasolina" />
        <h1 className="title">Qual a melhor opção?</h1>
        {/*Por se tratar de um formulario, utilizamos onSubmit ao inves de onClick*/}
        <form className="form" onSubmit={calcular}>
          <label className="label">Álcool (preço por litro):</label>
          <input
            className="input"
            type="Number"
            placeholder="4,90"
            min="1"
            step="0.01"
            required
            value={alcoolInput}
            /*utilizar "Number" para converter para numero, já que "e.target.value" sempre retorna uma string */
            onChange={(e) => setAlcoolInput(Number(e.target.value))}
          />

          <label className="label">Gasolina (preço por litro):</label>
          <input
            className="input"
            type="Number"
            placeholder="4,90"
            min="1"
            step="0.01"
            required
            value={gasolinaInput}
            /*utilizar "Number" para converter para numero, já que "e.target.value" sempre retorna uma string */
            onChange={(e) => setGasolinaInput(Number(e.target.value))}
          />
          <input className="button" type="submit" value="Calcular" />
        </form>
        {/*renderização condicional: 
        result &&: Verifica se result existe (não é null, undefined, false, etc.).
        Object.keys(result).length > 0: Se result for um objeto, isso verifica se ele tem alguma chave (não está vazio).
        Se as duas forem verdadeiras, o que estiver entre os parênteses é renderizado (nesse caso, a Section).*/}
        {result && Object.keys(result).length > 0 && (
          <section className="result">
            <h2 className="resultTitle">{result.title}</h2>
            <span>Álcool {result?.alcool}</span>
            <span>Gasolina {result?.gasolina}</span>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
