export function Error404() {
    return (<div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 bg-red-600 p-4 text-center">
            <p className="text-xl font-bold">ERROR 404</p>
            <p>Lo siento, página no encontrada. 😥</p>
        </div>
    </div>
    )
}