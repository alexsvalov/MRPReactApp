﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace MRPReactApp.Models;

public partial class Material
{
    public int Id { get; set; }

    public int Type { get; set; }

    public string Size { get; set; }

    public int Mark { get; set; }

    public virtual ICollection<Blank> Blank { get; set; } = new List<Blank>();

    public virtual MarkSteel MarkNavigation { get; set; }

    public virtual MaterialType TypeNavigation { get; set; }
}