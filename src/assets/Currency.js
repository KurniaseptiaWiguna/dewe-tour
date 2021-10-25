export const converToRupiah = (value) => {
    let rupiah = "";
    let valuerev = !isNaN(value)
        ?value.toString().split("").reverse().join("")
        : "0";

    for(let i = 0; i < valuerev.length; i++){
        if(i % 3 ==0) rupiah += valuerev.substr(i,3)+ ".";

    }
    return(
        "Rp. " +rupiah.split("",rupiah.length -1).reverse().join("")
    
    );

}