import Link from 'next/link';

export const AnchorButton = ({
    children,
    href,
}: {
    children: React.ReactNode;
    href: string;
}) => {
    return (
        <div className="btn-row fade-in">
            <Link href={href} className="btn btn-animate">
                <div className="arrow first">
                    <div className="arrow-fill"></div>
                    <div className="arrow-content">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <polyline
                                points="18 8 18 18 8 18"
                                fill="none"
                                stroke="#000"
                                strokeMiterlimit="10"
                            ></polyline>
                            <line
                                x1="18"
                                y1="18"
                                x2="5"
                                y2="5"
                                fill="none"
                                stroke="#000"
                                strokeMiterlimit="10"
                            ></line>
                        </svg>{' '}
                    </div>
                </div>
                <div className="btn-content">
                    <div className="btn-fill"></div>
                    <div className="btn-text">
                        <span>{children}</span>
                    </div>
                </div>
                <div className="arrow second">
                    <div className="arrow-fill"></div>
                    <div className="arrow-content">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <polyline
                                points="18 8 18 18 8 18"
                                fill="none"
                                stroke="#000"
                                strokeMiterlimit="10"
                            ></polyline>
                            <line
                                x1="18"
                                y1="18"
                                x2="5"
                                y2="5"
                                fill="none"
                                stroke="#000"
                                strokeMiterlimit="10"
                            ></line>
                        </svg>{' '}
                    </div>
                </div>
            </Link>
        </div>
    );
};
