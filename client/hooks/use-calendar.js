const useCalendar = (selected, setSelected) => {
    const year =selected.getFullYear()
    const month =selected.getMonth()
    const lastDate = new Date(selected.getFullYear(), selected.getMonth() + 1, 0)
    const firstDate = (new Date(selected.getFullYear(), selected.getMonth(), 1))
    const firstDay = firstDate.getDay()
    const dates = []
    if (firstDay === 0) {
        for(let i = 1; i <= 6; i++){
            dates.push(false)
        }
    }
    for(let i = 1; i <= firstDay-1; i++){
        dates.push(false)
    }
    for(let i = 1; i <= lastDate.getDate(); i++){
        dates.push(new Date(year, month, i))
    }
    function handleSelect(e) {
        setSelected(new Date(e.target.dataset.value))
    }
    function handleChangeYear(e) {
        setSelected(new Date(e.target.value, selected.getMonth(), selected.getDate()))
    }
    function handleChangeMonth(e) {
        setSelected(new Date(selected.getFullYear(), e.target.value, selected.getDate()))
    }
    function handleSelectNow() {
        setSelected(new Date())
    }
    return {handleSelect, handleChangeYear, handleChangeMonth, handleSelectNow, dates}
}

export default useCalendar;