function Toggler(props) {
    const {setselector_type, selector_type} = props;
  return (
    <select
      value={selector_type}
      className="form-select m-4"
      style={{width: '150px'}}
      onChange={(e) => setselector_type(e.target.value)}
    >
      <option value="Physical">Physical</option>
      <option value="Logical">Logical</option>
    </select>
  );
}

export default Toggler;
