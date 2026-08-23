export function QuoteModule() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Calcula el costo para tu empresa
        </h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          Usa nuestro cotizador interactivo para obtener un estimado al instante.
        </p>
        <div className="mt-10 mx-auto max-w-lg rounded-2xl bg-slate-50 dark:bg-slate-900 p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col gap-6">
            <div className="text-left">
              <label htmlFor="users" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Número de Usuarios
              </label>
              <input
                type="number"
                id="users"
                min="1"
                defaultValue="5"
                className="mt-2 block w-full rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-2 px-3 text-slate-900 dark:text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <button className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700">
              Cotizar ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
