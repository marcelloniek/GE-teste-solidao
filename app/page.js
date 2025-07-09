"use client";

import { useState } from 'react';

const perguntas = [
  "Ich fühle mich oft einsam oder von den Menschen in meiner Umgebung getrennt, selbst wenn ich in Gesellschaft bin.",
  "Ich habe Schwierigkeiten, enge und bedeutungsvolle Beziehungen aufzubauen oder aufrechtzuerhalten.",
  "Ich empfinde ständig eine emotionale Leere oder ein Gefühl des Verlassenwerdens, unabhängig davon, wer bei mir ist.",
  "Ich habe niemanden, mit dem ich meine tiefsten Gedanken, Gefühle oder Sorgen teilen kann.",
  "Mein Selbstwertgefühl und mein Selbstvertrauen sind durch das anhaltende Gefühl der Einsamkeit beeinträchtigt.",
  "Ich habe in letzter Zeit ernsthaft gedacht, dass mein Leben keinen Sinn hat oder dass es niemanden kümmern würde, wenn mir etwas Schlimmes zustoßen würde.", // FLAG
  "Ich vermeide oft soziale Situationen oder Interaktionsmöglichkeiten aus Angst vor Ablehnung oder Unzulänglichkeit.",
  "Ich habe erhebliche Schwierigkeiten, mich emotional zu öffnen und anderen Menschen zu vertrauen.",
  "Ich habe zu ungesunden oder schädlichen Methoden gegriffen, um mit meiner Einsamkeit fertig zu werden, wie übermäßiger Alkoholkonsum, Drogen oder extreme Isolation.",
  "Meine emotionale, körperliche oder geistige Gesundheit hat sich durch meine häufigen Einsamkeitsgefühle verschlechtert."
];

export default function TesteSolidao() {
  const [respostas, setRespostas] = useState(Array(10).fill(0));
  const [resultado, setResultado] = useState(null);
  const [indiceAtual, setIndiceAtual] = useState(0);

  const registrarResposta = (valor) => {
    const novasRespostas = [...respostas];
    novasRespostas[indiceAtual] = valor;
    setRespostas(novasRespostas);

    if (indiceAtual < perguntas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      calcularResultado(novasRespostas);
    }
  };

  const calcularResultado = (respostas) => {
    if (respostas[5] >= 3) { // FLAG
      setResultado("ROT");
    } else {
      const soma = respostas.reduce((a, b) => a + b, 0);
      if (soma <= 20) setResultado("GRÜN");
      else if (soma <= 35) setResultado("GELB");
      else setResultado("ROT");
    }
  };

  const reiniciarTeste = () => {
    setRespostas(Array(10).fill(0));
    setResultado(null);
    setIndiceAtual(0);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
      {!resultado ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Einsamkeitstest</h2>
          <p className="mb-4">{perguntas[indiceAtual]}</p>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => registrarResposta(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm">Frage {indiceAtual + 1} von {perguntas.length}</p>
        </>
      ) : (
        <>
          
          <h2 className="text-xl font-semibold mb-4 text-center">Resultado: {resultado}</h2>
          <img
            src={
              resultado === "GRÜN"
                ? "/images/semaforo-verde.png"
                : resultado === "GELB"
                ? "/images/semaforo-amarelo.png"
                : "/images/semaforo-vermelho.png"
            }
            alt={`Indicador ${resultado}`}
            className="w-40 h-auto mx-auto mb-4"
          />
          {resultado === "GRÜN" && (
            <p className="text-center">Sie kommen mit diesem Thema gut zurecht und sind emotional stabil. Sie könnten anderen Menschen, die Hilfe benötigen, eine große Unterstützung sein.</p>
          )}
          {resultado === "GELB" && (
            <p className="text-center">Es gibt deutliche Anzeichen emotionaler Schwierigkeiten, die bearbeitet werden sollten und mit Entschlossenheit und Unterstützung überwunden werden können.</p>
          )}
          {resultado === "ROT" && (
            <p className="text-center">Ihre emotionalen Schwierigkeiten in diesem Bereich erfordern unbedingt professionelle Hilfe. Bitte suchen Sie baldmöglichst einen Arzt oder Psychologen auf.</p>
          )}
          <button
            className="mt-6 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700 block mx-auto"
            onClick={reiniciarTeste}
          >
            Test neu starten
          </button>
    
        </>
      )}
    </div>
  );
}
