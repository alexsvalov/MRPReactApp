﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace MRPReactApp.Models;

public partial class PlanProduct
{
    public int Id { get; set; }

    public int Version { get; set; }

    public DateTime PlanDate { get; set; }

    public virtual ICollection<PlanComposition> PlanComposition { get; set; } = new List<PlanComposition>();
}