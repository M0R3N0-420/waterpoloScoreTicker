function WaterpoloDateSeparator({ date }) {
    // Formatear la fecha
    const formatDate = (dateString) => {
        // Parsear la fecha en formato YYYY-MM-DD
        const [year, month, day] = dateString.split('-').map(Number)
        const date = new Date(year, month - 1, day) // month - 1 porque los meses en JS son 0-11

        const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
        const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

        const dayName = days[date.getDay()]
        const dayOfMonth = date.getDate()
        const monthName = months[date.getMonth()]

        return { dayName, day: dayOfMonth, month: monthName }
    }

    const { dayName, day, month } = formatDate(date)

    return (
        <div className="w-16 h-24 pt-2 bg-gray-200 border border-gray-200 rounded-md shadow-sm text-xs flex flex-col items-center">
            <p className="font-bold text-sm">{dayName}</p>
            <p>{month}</p>
            <p>{day}</p>
        </div>
    )
}

export default WaterpoloDateSeparator