import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router

const Pagination = ({ pageIndex, pageSize, totalPages, setPageIndex, onChangePageSize }) => {
    useEffect(() => {
        // Ensure pageIndex stays within bounds when totalPages changes
        if (pageIndex > totalPages) {
            setPageIndex(Math.max(1, totalPages)); // Keep in valid range
        }
    }, [pageIndex, totalPages, setPageIndex]);

    return (
        <div className="d-lg-flex align-items-center text-center pb-1 pt-2">
            {/* Page Size Selection */}
            <div className="d-inline-block me-3">
                <label className="me-1">Display :</label>
                <select
                    value={pageSize}
                    onChange={(e) => {
                        const newSize = Number(e.target.value);
                        onChangePageSize(newSize);
                        setPageIndex(1); // Reset to first page
                    }}
                    className="form-select d-inline-block w-auto">
                    {[10, 20, 50, 100].map((size) => (
                        <option key={size} value={size}>{size}</option>
                    ))}
                </select>
            </div>

            {/* Page Info */}
            <span className="me-3">
                Page <strong>{pageIndex} of {totalPages}</strong>
            </span>

            {/* Go to Page Input */}
            <label>Go to page: </label>
            <input
                type="number"
                placeholder={`${pageIndex}`}
                min="1"
                max={totalPages}
                onChange={(e) => {
                    const enteredPage = Number(e.target.value);
                    if (enteredPage >= 1 && enteredPage <= totalPages) {
                        setPageIndex(enteredPage);
                    }
                }}
                className="form-control ms-1 d-inline-block"
                style={{ width: '80px' }}
            />

            {/* Pagination Controls */}
            <ul className="pagination pagination-rounded d-inline-flex ms-auto align-item-center mb-0 pe-4">
                {/* Previous Button */}
                {pageIndex > 1 && (
                    <li className="page-item" onClick={() => setPageIndex(pageIndex - 1)}>
                        <Link to="#" className="page-link">Previous</Link>
                    </li>
                )}

                {/* Page Number Buttons */}
                {Array.from({ length: totalPages }).map((_, i) => {
                    const page = i + 1; // Adjust index to start from 1
                    const isCurrentPage = page === pageIndex;
                    const isNearCurrent = page >= pageIndex - 1 && page <= pageIndex + 1;
                    const isEdgePage = page === 1 || page === totalPages;

                    if (totalPages <= 5 || isNearCurrent || isEdgePage) {
                        return (
                            <li key={page} className={`page-item ${isCurrentPage ? 'active' : ''}`}
                                onClick={() => setPageIndex(page)}>
                                <Link to="#" className="page-link">{page}</Link>
                            </li>
                        );
                    } else if ((page === 2 && pageIndex >= 5) || (page === totalPages - 1 && pageIndex <= totalPages - 4)) {
                        return <li key={page} className="page-ittotalPagesem disabled"><Link to="#" className="page-link px-0">...</Link></li>;
                    }

                    return null;
                })}

                {/* Next Button */}
                {pageIndex < totalPages && (
                    <li className="page-item" onClick={() => setPageIndex(pageIndex + 1)}>
                        <Link to="#" className="page-link">Next</Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Pagination;
