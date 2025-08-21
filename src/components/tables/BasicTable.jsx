import './Tables.css'

export default function BasicTable({ items = [], columns = [], renderActions }) {
    return (<>
        <table className="BasicTable">
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col.key}>{col.label}</th>
                    ))}
                    {renderActions && <th className="BasicTableAccionesCol">Acciones</th>}
                </tr>
            </thead>
            <tbody>
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <tr key={index}>
                            {columns.map((col) => (
                                <td key={col.key}>
                                    {item[col.key] ? (
                                        col.key.toLowerCase().includes('fechanacimiento') ? (
                                            // Solo FECHA
                                            new Date(item[col.key]).toLocaleDateString('es-ES')
                                        ) : col.key.toLowerCase().includes('fechahora') || col.key.toLowerCase().includes('fecha') ? (
                                            // FECHA + HORA
                                            new Date(item[col.key]).toLocaleString('es-ES', {
                                                dateStyle: 'short',
                                                timeStyle: 'short'
                                            })
                                        ) : (
                                            item[col.key]
                                        )
                                    ) : (
                                        ''
                                    )}
                                </td>
                            ))}
                            {renderActions && (
                                <td className="BasicTableAccionesCol">
                                    {renderActions(item)}
                                </td>
                            )}
                        </tr>
                    ))
                ) : (
                    <tr key={''}>
                        <td colSpan={columns.length + (renderActions ? 1 : 0)} style={{ textAlign: 'center', padding: '1rem' }}>
                            No hay datos disponibles.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </>);
}