const Footer = (): JSX.Element => {
    return (
        <>
            <div className="footer">
                <center>
                    <h3> © {new Date().getFullYear()} Stripe Testing. Demo environment. All rights reserved.</h3>
                </center>
            </div>
        </>
    );
};

export default Footer;