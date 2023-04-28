export default function (dom: React.MutableRefObject<HTMLDivElement>, tableHeadHeight = 40) {
    const [tableHeight, setTableHeight] = useState(0);
    const tableScrollHeightCompute = () => {
        const height = dom.current.offsetHeight;
        setTableHeight(height - tableHeadHeight);
    };

    useEffect(() => {
        window.addEventListener("resize", tableScrollHeightCompute);
        tableScrollHeightCompute();
        return () => {
            window.removeEventListener("resize", tableScrollHeightCompute);
        };
    }, []);

    return tableHeight
}