export default function StatusRenderer(props){
    const active = props.value;

    return(
        <span className={active ? "status active" : "status inactive"}>
            {active ? "Active" : "Inactive"}
        </span>
    );
}