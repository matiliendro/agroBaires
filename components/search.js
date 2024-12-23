import { debounce } from 'lodash';

const debouncedSearch = debounce((term) => {
    // tu lógica de búsqueda aquí
}, 300);

const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
}

return (
    <form onSubmit={handleSearch}>
        <input 
            type="text"
            onChange={handleInputChange}
            value={searchTerm}
        />
    </form>
) 