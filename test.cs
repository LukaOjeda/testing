using System;
using System.Collections.Generic;

public class Articulo
{
    public int Id { get; set; }
    public string Marca { get; set; }
    public string Modelo { get; set; }
    public int Cantidad { get; set; }
    public List<Compra> Compras { get; set; }
    public List<Venta> Ventas { get; set; }

    public Articulo(int id, string marca, string modelo, int cantidad)
    {
        Id = id;
        Marca = marca;
        Modelo = modelo;
        Cantidad = cantidad;
        Compras = new List<Compra>();
        Ventas = new List<Venta>();
    }
}

public class Proveedor
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public string Direccion { get; set; }
    public string Telefono { get; set; }

    public Proveedor(int id, string nombre, string direccion, string telefono)
    {
        Id = id;
        Nombre = nombre;
        Direccion = direccion;
        Telefono = telefono;
    }
}

public class Cliente
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public string Direccion { get; set; }
    public string Telefono { get; set; }

    public Cliente(int id, string nombre, string direccion, string telefono)
    {
        Id = id;
        Nombre = nombre;
        Direccion = direccion;
        Telefono = telefono;
    }
}

public class Usuario
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public string Contraseña { get; set; }

    public Usuario(int id, string nombre, string contraseña)
    {
        Id = id;
        Nombre = nombre;
        Contraseña = contraseña;
    }
}
public class Compra
{
    public int Id { get; set; }
    public Articulo Articulo { get; set; }
    public Proveedor Proveedor { get; set; }
    public int Cantidad { get; set; }
    public DateTime FechaCompra { get; set; }
    public DateTime FechaRecepcion { get; set; }

    public Compra(int id, Articulo articulo, Proveedor proveedor, int cantidad, DateTime fechaCompra, DateTime fechaRecepcion)
    {
        Id = id;
        Articulo = articulo;
        Proveedor = proveedor;
        Cantidad = cantidad;
        FechaCompra = fechaCompra;
        FechaRecepcion = fechaRecepcion;
    }
}

public class Venta
{
    public int Id { get; set; }
    public Articulo Articulo { get; set; }
    public Cliente Cliente { get; set; }
    public int Cantidad { get; set; }
    public decimal Precio { get; set; }
    public DateTime Fecha { get; set; }

    public Venta(int id, Articulo articulo, Cliente cliente, int cantidad, decimal precio, DateTime fecha)
    {
        Id = id;
        Articulo = articulo;
        Cliente = cliente;
        Cantidad = cantidad;
        Precio = precio;
        Fecha = fecha;
    }
}